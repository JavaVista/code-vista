export interface ButtonProps {
    isDisabled?: boolean;
    isLoading?: boolean;
    isLoadingLabel?: string;
    label: string;
    style?: string;
    handleFunction?: any;
    noBackground?: boolean;
}