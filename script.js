class SearchButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = { images: [], urls: [] }
    }

    getImage = async () => {
        // const [images, setImages] = React.useState({});
        let query = document.getElementById("query").value;
        query = query !== '' ? query : '';

        if (!query) {
            alert("Enter a word")
            return;
        }
        const response = await fetch('https://splash-api-worker.shubh-johri-96.workers.dev', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ query })
        });
        let images;
        const imageData = await response.json();

        if (response) {
            images = imageData.map(image => {
                return image.image
            });

            this.setState({ images: images });

            return images;
        }
    };

    Images(images) {
        console.log(images);
        if (images) {
            return images.images.map((image, key) => {
                return <img src={image} key={key} />
            })
        }
    }

    // RenderImage (images) {
    //     return images.map(image => {
    //         return <img src={image} alt="" srcset="" />
    //     })
    // }

    render() {
        return (
            <div className="container d-flex justify-content-center row">
                <input className="form-control-sm" placeholder="search for image.." type="text" name="query" id="query" />
                <button className="btn btn-primary" onClick={() => this.getImage()}>
                    Search
                </button>
                <div >
                    <this.Images images={this.state.images.length > 0 ? this.state.images : []} />
                </div>
            </div>
        );
    }
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<SearchButton />)
