// utils
import img1 from "../utils/img/1.jpg";
import img2 from "../utils/img/2.jpg";
import img3 from "../utils/img/3.jpg";
import img4 from "../utils/img/4.jpg";
import img5 from "../utils/img/5.jpg";
import img6 from "../utils/img/6.jpg";
import img7 from "../utils/img/7.jpg";
import banner from "../utils/img/banner.jpg";
import icono1 from "../utils/img/icono1.png";
import icono2 from "../utils/img/icono2.png";
import icono3 from "../utils/img/icono3.png";

const Home = () => {
  return (
    <>
      <div className="banner">
        <img src={banner} alt="" title="" />
        <div className="contenedor">
          <h1 className="banner__titulo"></h1>
          <p className="banner__txt"></p>
        </div>
      </div>
      <main className="main">
        <section className="info">
          <div className="contenedor">
            <article className="info__columna">
              <img src={img1} alt="" className="info__img" />
              <h2 className="info__titulo">Título 1</h2>
              <p className="info__txt">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam,
              </p>
            </article>
            <article className="info__columna">
              <img src={img2} alt="" className="info__img" />
              <h2 className="info__titulo">Título 2</h2>
              <p className="info__txt">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam,
              </p>
            </article>
            <article className="info__columna">
              <img src={img3} alt="" className="info__img" />
              <h2 className="info__titulo">Título 3</h2>
              <p className="info__txt">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam,
              </p>
            </article>
          </div>
        </section>

        <section className="platos">
          <div className="contenedor">
            <h2 className="platos__titulo">RESTAURANTES</h2>
            <p className="platos__txt">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam,
            </p>
            <div className="platos__columna">
              <img src={img4} alt="" className="platos__img" />
              <h3>Tierra de feijoa</h3>
            </div>
            <div className="platos__columna">
              <img src={img5} alt="" className="platos__img" />
              <h3>Aborigen</h3>
            </div>
            <div className="platos__columna">
              <img src={img6} alt="" className="platos__img" />
              <h3>Delicias</h3>
            </div>
            <div className="platos__columna">
              <img src={img7} alt="" className="platos__img" />
              <h3>Casa Grande</h3>
            </div>
          </div>
        </section>

        <section className="mapa">
          <div className="contenedor">
            <div className="mapa__iframe">
              <h3>EXPLORA TIBASOSA</h3>
              <br />

              <iframe
                title="qdqdqwd"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7939.530381325414!2d-73.00391587379183!3d5.7469076582735195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6a413bf00367cb%3A0x5be4ebc6abb105b2!2sTibasosa%2C%20Boyac%C3%A1!5e0!3m2!1ses!2sco!4v1615260405782!5m2!1ses!2sco"
                width="90%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <h2>Siguenos en: </h2>
        <div className="social">
          <a href="https://www.facebook.com/tibasosa.boyaca.50" target="blank">
            <img src={icono1} alt="" title="" />
          </a>
          <a href="https://twitter.com/AlcaTibasosa" target="blank">
            <img src={icono2} alt="" title="" />
          </a>
          <a
            href="https://www.youtube.com/channel/UC9MeD-aHvzi0dM5KE-A8m2w/featured"
            target="blank"
          >
            <img src={icono3} alt="" title="" />
          </a>
        </div>
        <p className="copy">
          &copy; Todos los derechos reservados a TibaRismo | 2021
        </p>
      </footer>
    </>
  );
};
export default Home;
