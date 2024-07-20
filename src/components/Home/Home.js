const Home = () => {
    return (
        <div className="home-container container">
            <div className="row">
                <div className="col-12 mt-3">
                    <h4>Welcome !</h4>
                    <div className="title mt-1">
                        <h6>AAAAAAAAAAAAAAAAAAAAAAA</h6>
                    </div>
                    <div className="description mt-3">
                        <b>Bạn muốn làm gì</b>
                    </div>
                    <div className="embed-container mt-3">
                        <iframe
                            src="https://www.youtube.com/embed/W4Swti-ZdPA?list=PLncHg6Kn2JT7vOvooGw-yXcj6MHKrOpTZ"
                            title="Youtube Video Player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen></iframe>
                    </div>
                    <div className="space"></div>
                </div>
            </div>
        </div>
    )
}

export default Home;