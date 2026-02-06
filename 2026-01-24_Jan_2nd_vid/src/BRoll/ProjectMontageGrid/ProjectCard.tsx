import { Img } from 'remotion';

interface ProjectCardProps {
    src: string;
    width: number;
    height: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ src, width, height }) => {
    return (
        <div
            style={{
                width: width,
                height: height,
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: '1px solid #1e293b',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#1e293b' // fallback
            }}
        >
            <Img
                src={src}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
            />
            {/* Glossy Overlay */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '40%',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
                    pointerEvents: 'none'
                }}
            />
        </div>
    );
};
