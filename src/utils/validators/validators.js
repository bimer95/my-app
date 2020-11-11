export const required = value => { //обязательное поле 
    if (value) return undefined;

    return 'Field is required';
    
}

export const maxLengthCreator = (maxLength) => value => { //максимальное количество символов 
    if (value.length > maxLength) return 'Max length is $ {maxLength} symbols'; 

    return undefined;
    
}