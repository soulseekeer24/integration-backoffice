import {CSSProperties} from "react";

export type TextVariant = 'title' | 'paragraph';

export interface TextProps {
    content: string;
    variant: TextVariant
    className?: string | undefined;
}

const stylesMap: { [key: string]: CSSProperties } = {
    title: {
        fontWeight: 'bold',
        fontSize: '1.5em',
    }
}
export const Text: React.FC<TextProps> = ({content, variant = 'paragraph',className}) => {
    const styleProps: CSSProperties = stylesMap[variant];
    return (
        // temporalmente blanco, hay que definir paleta de colores o tema
        <p className={className} style={styleProps}>{content}</p>
    );
};
