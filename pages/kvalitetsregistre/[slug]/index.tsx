import { GetServerSideProps, GetStaticPaths } from "next";
import { useRegisterNamesQuery } from "../../../src/helpers/hooks/apihooks";

function Page({ data }) {
    return(
        <>
        {data.map((id) => {
            return(<h2>{id}</h2>)
        }
        )}
        </>
    )
    
    // Render data...
  }
  
  // This gets called on every request
  export async function getServerSideProps(context) {

    console.log(context.query.slug)
    const API_HOST =
  process.env.REACT_APP_API_HOST ?? "http://localhost:4000";
    // Fetch data from external API
    const res = await fetch(`https://dc9yut6ftb9m1.cloudfront.net/info/names`)
    const data_tmp = await res.json()


        const data = data_tmp.map((register) => {
            return(register.rname)
        })
    
//    } else {
//        const data = data_tmp.map((register) => {
 //           return(register.rname)
  //      })

 //   }
  
    // Pass data to the page via props
    return { props: { data } }
  }

 
  export default Page
