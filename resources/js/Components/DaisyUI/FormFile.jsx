import React, { useRef, useState } from 'react'
import { toast } from 'sonner'
import { usePage } from '@inertiajs/react'
import Spinner from './Spinner'
import { isEmpty } from 'lodash'

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

    const [name, setName] = useState('File')
    const [link, setLink] = useState(url)
    const [loading, setLoading] = useState(false)
    const [percent, setPercent] = useState(0)

    const handleClick = () => {
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
        <div className="my-2">
            <div className="form-control w-full">
                {label !== '' && (
                    <div className="label">
                        <span className="label-text">{label}</span>
                    </div>
                )}
                {preview && preview}
                {loading ? (
                    <div className="file-input input-bordered">
                        <div className="flex flex-row space-x-2 items-center h-full pl-2">
                            <Spinner />
                            <div>{percent} Uploading...</div>
                        </div>
                    </div>
                ) : (
                    <div
                        onClick={handleClick}
                        className={`input input-bordered ${
                            error ? 'input-error' : ''
                        }`}
                    >
                        <div className="flex flex-row space-x-2 h-full">
                            <div className="-ml-4 bg-base-200 h-full input px-4 font-bold flex flex-row items-center">
                                <div>Choose a file</div>
                            </div>
                            <div className="text-opacity-35 text-base-content flex flex-row items-center">
                                <div>{name}</div>
                            </div>
                        </div>
                    </div>
                )}
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
                {error && (
                    <div className="label">
                        <span className="label-text-alt text-red-600">
                            {error}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
