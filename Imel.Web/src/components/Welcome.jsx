export const Welcome = () => {
  return (
    <section id="welcome">
      <h1>Dobrodošli na aplikaciju Imel d.o.o</h1>
      <h4>
        Ovo što ćete da pregledate predstavlja zadatke za ulazak u radni odnos
        sa Imel d.o.o!
      </h4>
      <p>
        Tokom kreiranja aplikacije korišteni su: .NET 8, Vite, Redux Toolkit,
        MSSQL Developer 2019, JavaScript, React.{" "}
        <strong>
          Aplikacija je full responsive i primarni dizajn joj je trenutno
          koncipiran za full HD 17'' ekrane(1440px)
        </strong>
      </p>
      <br />
      <p>
        Da biste pristupili aplikaciji potrebno se registrovati. Klikom na dugme
        <a href="/register" className="create-acc-btn">
          napravi korisnički račun
        </a>
        to možete i uraditi
      </p>

      <footer>
        <p>
          Kreirao <strong>&copy; Admir Sitnić, 2025</strong>
        </p>
      </footer>
    </section>
  );
};
