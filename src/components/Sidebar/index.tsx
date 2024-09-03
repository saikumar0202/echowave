import './styles.scss';
export const Sidebar = () => {
    return (
        <aside className='sidebar'>
            <div className="sidebar__top">
                <div className="sidebar__top__profile">
                    <button><i className="fa-regular fa-circle"></i></button>
                    <button><i className="fa-solid fa-user"></i></button>
                </div>
                <div className="sidebar__top__border"></div>
                <div className="sidebar__top__songActions">
                    <button><i className="fa-solid fa-compass"></i></button>
                    <button><i className="fa-solid fa-headphones"></i></button>
                    <button><i className="fa-regular fa-heart"></i></button>
                    <button><i className="fa-solid fa-book-bookmark" style={{ color: "#28a42a" }}></i></button>
                </div>
            </div>
            <div className="sidebar__bottom">
                <div className="sidebar__bottom__actions">
                    <button><i className="fa-solid fa-gear"></i></button>
                    <button><i className="fa-solid fa-right-from-bracket"></i></button>
                </div>
            </div>
        </aside>
    );
};