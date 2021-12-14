export const dropdownCalendar ={
    labelContent:'Даты пребывания в отеле',
    btnContent:'Дата не указана '
}

export const dropdownGuests = {
    labelContent:'Гости',
    btnContent:'Гости не указаны',
    keyWord:'Количество гостей:',
    allCount:true,
    field:[
        {
            name:'Взрослые',
            count: 0,
            type:'adults'
        },
        {
            name:'Дети',
            count: 0,
            type:'children'
        },
        {
            name:'Младенцы',
            count: 0,
            type:'babies'
        },
    ]
}
export const dropdownAvailability = {
    labelContent:'Удобства номера',
    btnContent:'Не указано ',
    keyWord:'Количество спален:',
    allCount:false,
    field:[
        {
            name:'Спальни',
            count: 0,
            type:'bedroom'
        },
        {
            name:'Кровати',
            count: 0,
            type:'bed'
        },
    ]
}