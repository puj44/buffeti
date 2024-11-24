export const hours = [
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21"
];
export const minutes = [
    "00",
    "15",
    "30",
    "45"
];

export const hour24Convert = {
    "13":"1",
    "14":"2",
    "15":"3",
    "16":"4",
    "17":"5",
    "18":"6",
    "19":"7",
    "20":"8",
    "21":"9"
}

export const hourMinutes = () =>{
    let hourMinutesTime = [];
    hours.map((h)=>{
        minutes.map((t)=>{
            hourMinutesTime.push(h+t);
        })
    })
    return hourMinutesTime;
}

export const config = {
    "mini-meals":[
        {
            min:1145,
            max:2130
        }
    ],
    "snack-boxes":[
        {
            min:1145,
            max:2130
        }
    ],
    "click2cater":[
        {
            min:1315,
            max:1415
        },
        {
            min:1915,
            max:2130
        },
    ]
}