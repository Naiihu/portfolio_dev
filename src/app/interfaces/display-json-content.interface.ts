export interface DisplayJsonContentInterface {
    title: string,
    text?: string,
    imgUrl?: string,
    imgAlt?: string,
    template?: string,
    multiTemplates?: Record<string, string[]>,
    folder?: string,
    defaultDisplay?: 'Main'|'Secondary'
};