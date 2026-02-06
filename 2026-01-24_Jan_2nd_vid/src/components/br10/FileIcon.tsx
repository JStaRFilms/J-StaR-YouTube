import React from 'react';
import { Folder, FileText, Code2 } from 'lucide-react';

type FileType = 'folder' | 'markdown' | 'script';

interface FileIconProps {
    type: FileType;
    highlighted?: boolean;
}

export const FileIcon: React.FC<FileIconProps> = ({ type, highlighted }) => {
    const getColor = () => {
        switch (type) {
            case 'folder':
                return '#fbbf24'; // Amber-400
            case 'markdown':
                return '#22c55e'; // Green-500
            case 'script':
                return '#3b82f6'; // Blue-500
            default:
                return '#94a3b8'; // Slate-400
        }
    };

    const IconComponent = () => {
        switch (type) {
            case 'folder':
                return <Folder size={24} fill={highlighted ? getColor() : 'none'} />;
            case 'markdown':
                return <FileText size={24} />;
            case 'script':
                return <Code2 size={24} />;
        }
    };

    return (
        <div
            style={{
                color: getColor(),
                filter: highlighted ? `drop-shadow(0 0 8px ${getColor()})` : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <IconComponent />
        </div>
    );
};
