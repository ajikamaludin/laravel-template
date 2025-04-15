import { isEmpty } from 'lodash'
import { useRef, useState } from 'react'
import Spinner from './spinner'
import { usePage } from '@inertiajs/react'
import { toast } from 'sonner'

export default function FormFileCustom({ onSuccess, children }) {
    const {
        props: { auth },
    } = usePage()
    const inputRef = useRef()

    const [loading, setLoading] = useState(false)
    const [percent, setPercent] = useState(0)

    const handleClickUpload = () => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }
    const handleOnChange = (e) => {
        try {
            if (isEmpty(e.target.files)) {
                console.log('target file empty')
                return
            }

            setLoading(true)

            const formData = new FormData()
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
                                (progressEvent.loaded * 100) /
                                    progressEvent.total
                            )
                        )
                    },
                })
                .then((response) => {
                    onSuccess(response.data)
                })
                .catch((error) => {
                    toast.error(error.response.data.message)
                })
                .finally(() => {
                    setLoading(false)
                })
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <>
            {loading ? (
                <div className="w-fit flex flex-row items-center gap-2 py-2 px-4 rounded-md bg-base-100">
                    <Spinner />
                    uploading . . .
                </div>
            ) : (
                <div className="w-fit" onClick={handleClickUpload}>
                    {children}
                </div>
            )}
            <div className="hidden">
                <input
                    className="hidden"
                    type="file"
                    onChange={handleOnChange}
                    ref={inputRef}
                />
            </div>
        </>
    )
}
