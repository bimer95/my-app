export type FieldValidatorType = (value: string) => string | undefined


export const required: FieldValidatorType = (value) => { //обязательное поле 
    if (value) return undefined;

    return 'Field is required';
    
}

export const maxLengthCreator = (maxLength: number): FieldValidatorType => (value)=> { //максимальное количество символов 
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`; 

    return undefined;
    
}