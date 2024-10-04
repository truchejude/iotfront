function NavBar() {
    function deconextion() {
        localStorage.setItem("jwtEsp32ailEauThe", "");
        window.location.reload();
    }

    return (
        <div style={{ display: "flex", height: "64px", position: 'fixed', width: '100%', top: '0px', left: '0px', justifyContent: 'space-around', marginTop: '10px' }}>
            <button onClick={() => deconextion()}>Déconextion</button>
        </div>
    );
}

export default NavBar;
