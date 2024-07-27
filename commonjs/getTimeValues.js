const getTimeValues = () =>{
    const hours = [
        "11",
        "12",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10"
    ]
    const minutes = [
        "00",
        "15",
        "30",
        "45"
    ];
    const time = []; 
    hours.map((h)=>{
        minutes.map((t)=>{
            if(h !== "11" && h !== "10"){
                time.push(h+":"+t);
            }
            else{
                if(h === "11"){

                    if(t === "45"){
                        time.push(h+":"+t);
                    }
                }else{
                    if(t === "00"){
                        time.push(h+":"+t);
                    }
                }
            }
        })
    })
    return time;
}

export default getTimeValues;