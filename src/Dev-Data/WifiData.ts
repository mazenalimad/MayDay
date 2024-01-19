interface Detail {
    SSID:string
    Distence: number;
}

interface Details extends Array<Details>{}
let wifiDetails:Detail[] = [] ;

if(wifiDetails.length <= 0 ){
    wifiDetails = []   
}else{
    wifiDetails.sort((a , b)=>{

        return a.Distence - b.Distence 
    })
}

export function clearWifiList(){

    //last min solution lol
wifiDetails.length = 0


    
    
}

export default wifiDetails;