import Image from "next/image"


const BannerGroup = ({recruitsArray, setActiveRecruit}) => {
    if(!recruitsArray){
        return null;
    }else{
     
        return(
        <div className="recruit-banner-div">
            {recruitsArray.map(recruit => 
            <Image key={recruit.id} onClick={()=>setActiveRecruit(recruit)} src={recruit.image}
                unoptimized="true" width="193" height="86" alt="소집배너"></Image>  
            )}
        </div>
        )
        
    }
}

export default BannerGroup;