export interface Page<T> {
    content: T[];
    page: number;
    size: number;
    total_elements: number;
}

