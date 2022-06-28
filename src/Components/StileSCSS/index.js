import styles from "./style.scss";

export function StileSCSS() {
    return (
        <div>
            <h1>Hello world</h1>
            <ul>
                <li><a href="http://">Home</a></li>
                <li><a href="http://">Test</a></li>
                <li><a href="http://">Contatti</a></li>
            </ul>
            <p>
                <b>Lorem ipsum dolor</b>, sit amet consectetur adipisicing elit. Nihil quos mollitia ab. At dolor dicta corporis dolores, asperiores aliquam, commodi pariatur <em>perferendis consequuntur cumque</em> nobis sequi laborum repellendus, neque aliquid.
            </p>
            <pre>{JSON.stringify(styles)}</pre>
        </div>
    )
}