// import moment from "moment";

import { config, hour24Convert } from "@/config/deliverySchedule";

const getTimeValues = (menuOption,hourMinutesValues) =>{
    // let currentTime = moment(new Date()).format("HH");
    // let diff = moment(new Date(selectedDate)).diff(new Date(),"days");

    let times = []; 
    const menuConfig = config[menuOption] ?? [];
    hourMinutesValues.map((hm)=>{

        menuConfig.map((mc)=>{
            const time = Number(hm);
            if(time >= mc.min && time <= mc.max){
                const hourStr = hm.charAt(0) + hm.charAt(1);
                
                const hour = hour24Convert[hourStr] ?? hourStr;
                const minutes = hm.charAt(2) + hm.charAt(3);
                const timeStamp = hourStr > 11? "pm":"am";
                const timeStr = hour + ":" +minutes + " "+ timeStamp;
                times.push(timeStr)
            }
        })
    })
    return times;
}

export default getTimeValues;