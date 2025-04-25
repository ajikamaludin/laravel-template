import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { isEmpty } from 'lodash'
import { usePage } from '@inertiajs/react'

import Spinner from './spinner'
import TextInputError from './text-input-error'
import Label from './label'
import { trimText } from '@/utils'

/**
 *
 * @param {*} param0
 * @returns
 *
 * Example :
 * <FormFile
 *    label={'App Logo'}
 *    onChange={(file_path) => setData('app_logo', file_path)}
 *    error={errors.app_logo}
 *    url={app_logo_url}
 *    filemimes="image/jpg,image/jpeg,image/png"
 * />
 *
 */
export default function FormFile({
    label,
    onChange,
    error,
    preview,
    help,
    url,
    filemimes = '',
}) {
    const {
        props: { auth },
    } = usePage()
    const inputRef = useRef()

    const [name, setName] = useState('No file chosen')
    const [link, setLink] = useState(url)
    const [loading, setLoading] = useState(false)
    const [percent, setPercent] = useState(0)

    const handleClick = () => {
        if (loading) {
            return
        }
        inputRef.current.click()
    }

    const handleOnChange = (e) => {
        if (isEmpty(e.target.files)) {
            console.log('target file empty')
            return
        }

        setLoading(true)

        const formData = new FormData()
        formData.append('filemimes', filemimes)
        formData.append('file', e.target.files[0])

        axios
            .post(route('api.file.store'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: auth.jwt_prefix + auth.jwt_token,
                },
                onUploadProgress: function (progressEvent) {
                    setPercent(
                        Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        )
                    )
                },
            })
            .then((response) => {
                onChange(response.data.name)
                setLink(response.data.url)
                setName(response.data.name_original)
            })
            .catch((error) => {
                toast.error(error.response.data.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className="fieldset">
            <Label label={label} />
            {preview && preview}
            <div
                onClick={handleClick}
                className={`h-[2.5rem] w-full p-0 input rounded-md ${
                    error ? 'input-error' : ''
                }`}
            >
                <div className="flex flex-row space-x-2 h-full rounded-md">
                    <div className="bg-base-300 px-4 font-bold flex flex-row items-center rounded-md">
                        <div>Choose file</div>
                    </div>

                    <div className="text-opacity-35 text-base-content flex flex-row items-center">
                        {loading ? (
                            <div className="flex flex-row space-x-2 items-center h-full pl-2">
                                <Spinner />
                                <div>{percent} Uploading...</div>
                            </div>
                        ) : (
                            <div>{trimText(name, 30)}</div>
                        )}
                    </div>
                </div>
            </div>

            <input
                id={label}
                className="hidden"
                type="file"
                onChange={handleOnChange}
                ref={inputRef}
            />
            {help && (
                <div className="label">
                    <span className="label-text-alt">{help}</span>
                </div>
            )}
            {link && (
                <div className="label">
                    <a
                        className="label-text-alt link"
                        href={link}
                        target="_blank"
                    >
                        Download File
                    </a>
                </div>
            )}
            <TextInputError error={error} />
        </div>
    )
}
