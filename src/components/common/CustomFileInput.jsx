import React, { useState } from 'react';
import { useController } from 'react-hook-form';

const CustomFileInput = ({
    name,
    control,
    rules,
    accept = '*',
    maxFileSize = 5 * 1024 * 1024, // 5MB default
    placeholder = 'Drag and drop a file here or click to browse',
    label = 'Upload File',
    errors,
    className = '',
}) => {
    const {
        field: { onChange, ref, value },
        fieldState: { error },
    } = useController({ name, control, rules });

    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [validationError, setValidationError] = useState(null);


    const validateFile = (file) => {
        if (!file) return true;
        const validTypes = accept.split(',').map((ext) => ext.trim());
        const isValidType = validTypes.includes('*') || validTypes.some((ext) => file.type.includes(ext.replace('.', '')));
        const isValidSize = file.size <= maxFileSize;
        if (!isValidType) {
            setValidationError('Invalid file type. Please select a valid file.');
            return false;
        }
        if (!isValidSize) {
            setValidationError(`File size exceeds ${maxFileSize / (1024 * 1024)}MB limit.`);
            return false;
        }
        setValidationError(null);
        return true;
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && validateFile(file)) {
            setIsLoading(true);
            setTimeout(() => {
                onChange(file);
                setIsLoading(false);
            }, 500); // Simulate upload delay
        } else {
            onChange(null);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && validateFile(file)) {
            setIsLoading(true);
            setTimeout(() => {
                onChange(file);
                setIsLoading(false);
            }, 500); // Simulate upload delay
        } else {
            onChange(null);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const formatFileSize = (size) => {
        if (size < 1024) return `${size} B`;
        if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
        return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (
        <div className={`col-12 ${className}`}>
            {label && (
                <label
                    htmlFor={name}
                    className="form-label fw-semibold mb-2"
                >
                    {label}
                </label>
            )}

            <label
                htmlFor={name}
                className={`d-block border border-dashed rounded p-5 text-center position-relative transition ${isDragging
                        ? 'border-primary bg-primary-subtle'
                        : error || validationError
                            ? 'border-danger bg-danger-subtle'
                            : 'hover-border-primary cursor-pointer'
                    } ${isLoading ? 'opacity-50' : ''}`}
                style={{ transition: 'all 0.3s ease', minHeight: '150px' }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                role="region"
                aria-label="Drag and drop or click to upload file"
                aria-busy={isLoading}
            >
                {isLoading && (
                    <div className="position-absolute top-50 start-50 translate-middle">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
                <div className="d-flex flex-column align-items-center justify-content-center h-100">
                    <i
                        className={`fas fa-upload fs-2 mb-2 ${isDragging ? 'animate__animated animate__pulse animate__infinite' : ''
                            }`}
                        aria-hidden="true"
                    ></i>
                    <span className="text-color fs-5">{value ? value.name : placeholder}</span>
                </div>
                <input
                    type="file"
                    id={name}
                    ref={ref}
                    onChange={handleFileChange}
                    accept={accept}
                    className="d-none"
                    aria-describedby={error || validationError ? `${name}-error` : undefined}
                />
            </label>

            {(error || validationError) && (
                <div id={`${name}-error`} className="mt-2 d-flex align-items-center text-danger small">
                    <i className="fas fa-times-circle me-1" aria-hidden="true"></i>
                    {error?.message || validationError}
                </div>
            )}
        </div>
    );
};

export default CustomFileInput;