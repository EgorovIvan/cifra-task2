export const formatDate = (dateString?: string): string => {
    if (!dateString || isNaN(Date.parse(dateString))) return '';
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
};

export const formatDateISO8601  = (dateString?: string): string => {
    if (!dateString || isNaN(Date.parse(dateString))) return '';
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};
