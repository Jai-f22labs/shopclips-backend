

async function handleFileUpload(file) {
    var myHeaders = new Headers()
    myHeaders.append('accept', 'application/json')
    var formdata = new FormData()
    formdata.append('files', file, '/path/to/file')
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
    }
    fetch(`${dataURL}/api/upload`, requestOptions)
        .then((response) => response.json())
        // https://d1b94xdk5eff5f.cloudfront.net/
        .then((result) =>
            // setData((prev) => {
            //     return {
            //         ...prev,
            //         video: `https://d1b94xdk5eff5f.cloudfront.net${
            //             result[0].url.split(
            //                 'https://shopclips1.s3.ap-south-1.amazonaws.com'
            //             )[1]
            //         }`,
            //     }
            // })
            console.log(result)
        )
        .catch((error) => console.log('error', error))
}
const dataURL = 'https://shopify-shopclips.uakhui.easypanel.host'


export default handleFileUpload;