function Map() {
    return (
        <div className="MapPage">
            <div className={`MainTopNav ${isScrolled ? 'hidden' : ''}`}>
                <div>

                    <p className='Logoname'>에케플</p>

                </div>
                <div className="MainTopNavListBox">
                    <Link to="/shop" style={{ color: "rgb(111, 111, 111)", textDecoration: "none" }}><p className={`MainTopNavList ${mainlist[0] === "상점" ? "active" : ""}`} onClick={() => {
                        let copy = [...mainlist];
                        copy[0] = "상점";
                        Setmainlist(copy)
                    }}>상  점</p></Link>
                    <Link to="/shop" style={{ color: "rgb(111, 111, 111)", textDecoration: "none" }}><p className={`MainTopNavList ${mainlist[0] === "게시판" ? "active" : ""}`} onClick={() => {
                        let copy = [...mainlist];
                        copy[0] = "게시판";
                        Setmainlist(copy)
                    }}>게시판</p></Link>
                    <Link to="/camera" style={{ color: "rgb(111, 111, 111)", textDecoration: "none" }}><p className={`MainTopNavList ${mainlist[0] === "지도" ? "active" : ""}`} onClick={() => {
                        let copy = [...mainlist];
                        copy[0] = "지도";
                        Setmainlist(copy)
                    }}>지도</p></Link>
                    <Link to="/vaccin" style={{ color: "rgb(111, 111, 111)", textDecoration: "none" }}><p className={`MainTopNavList ${mainlist[0] === "접종" ? "active" : ""}`} onClick={() => {
                        let copy = [...mainlist];
                        copy[0] = "접종";
                        Setmainlist(copy)
                    }}>접종</p></Link>

                    <div className='MainBottomNav'>
                        <Link to="/main" style={{ textDecoration: "none", color: "#9a9a9a" }}>
                            <div>
                                <FontAwesomeIcon icon={faHouse} />
                            </div>
                        </Link>
                        <Link to="/camera" style={{ textDecoration: "none", color: "#9a9a9a" }}>
                            <div>
                                <FontAwesomeIcon icon={faCamera} />
                            </div>
                        </Link>

                        <div>
                            <FontAwesomeIcon icon={faAngleLeft} onClick={() => {
                                navigate(-1)
                            }} />

                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
export default Map()