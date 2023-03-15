import "../footer-style.css"

export default function Footer() {


    return (
        <>

            <svg className="bg-img-footer "
                width="100vw"
                

                preserveAspectRatio="true"
                viewBox="0 0 100 7"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"

            >
                <path
                    style={{ fill: '#0B162C', strokeWidth: 0.836684 }}
                    d="m 0,6 c 11.1,-4 25,-5.5 31.5,-5.5 c 4.6,0 14.8,1.5 18.5,3 c 6.4,2.6 10.1,2 25,2 c 14.9,0 25,0 25,0 l 0,2 h -100 z"
                />
            </svg>


            <div className="fixed-bottom bg-dark taille-footer">

            </div>

        </>

    )
}