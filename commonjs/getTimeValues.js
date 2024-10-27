import moment from "moment";

const getTimeValues = (selectedDate) =>{
    let currentTime = moment(new Date()).format("HH");
    let diff = moment(new Date(selectedDate)).diff(new Date(),"days");
    
    const hours = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
    ]
    const minutes = [
        "00",
        "30"
    ];
    const time = []; 
    hours.map((h)=>{
        minutes.map((t)=>{
            time.push(h+":"+t+" pm")
        })
    })
    return time;
}

export default getTimeValues;