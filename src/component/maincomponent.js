import React from 'react';
function Main() {
    return (
        <div>
            <div className='MainTopLogoBox'>
                <h2 style={{ paddingTop: "110px" }} className='MainLogo'>Search for a pet</h2>
                <input type="text" placeholder="Search..." className='MainInput'></input>
            </div>
            <div className='MainSectionLogoBox'>
                <div className='MainListContainer'>
                    <div className='MainList'></div>
                    <div className='MainList'></div>
                    <div className='MainList'></div>
                    <div className='MainList'></div>
                    <div className='MainList'></div>
                </div>
                <h3 className='MainSectionLogo' style={{textAlign:"left",paddingLeft:"5%",marginBottom:"-10px"}}>Feacturd pets</h3>

            </div>
            <div className='boxcontainer'>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
            </div>
            
        </div>

    )
}
export default Main;