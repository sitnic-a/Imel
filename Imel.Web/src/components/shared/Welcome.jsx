export const Welcome = () => {
  return (
    <section id="welcome">
      <h1>Dobrodošli na aplikaciju Imel d.o.o</h1>
      <h4>
        Ovdje se nalaze informacije vezane za proces kreiranja ove aplikacije te
        zadaci za ulazak u radni odnos sa Imel d.o.o!
      </h4>
      <p>
        Tokom kreiranja aplikacije korišteni su: .NET 8, Vite, Redux Toolkit,
        MSSQL Developer 2019, JavaScript, React
        <strong>
          Aplikacija je full responsive i primarni dizajn joj je trenutno
          koncipiran za ekrane (1440px)
        </strong>
      </p>

      <ul>
        <span className="ulist-title">Napomene za aplikaciju:</span>
        <ul>
          <span className="ulist-subtitle">Pristup:</span>

          <li>Koriste se RBAC pristup, sa omogućenom JWT authorizacijom</li>
          <li>
            Prilikom prvog kreiranja baze, kreira se jedan user(administrator)
          </li>
          <li>
            <br />
            Pristupni podaci za admina su: <br />
            <strong>Email: </strong> admin@imel.ba <br />
            <strong>Password: </strong>Admin_Imel2025!
          </li>
          <br />
          <li>
            Admin rola ima mogućnost potpune manipulacije userima(pregled,
            uređivanje, brisanje, dodavanje i filtriranje). Filtriranje je
            moguće vršiti po bilo kojem parametru
          </li>
          <li>Dodatna funkcionalnost je eksportovanje usera u pdf file</li>
          <li>
            Ukoliko se 5 puta pogrešno unesu pristupni podaci, aplikacija će
            onemogućiti korisniku unos podataka u trajanju od 2 minute ukoliko
            se stranica ne pokrene ponovo
          </li>
        </ul>
        <br />
        <ul>
          <span className="ulist-subtitle">Izgled i verzioniranje:</span>
          <li>
            Nisam posjedovao DevExpress tako da sam odlučio napraviti dizajn
            koji je približan onome što DevExpress DataGridView komponenta nudi
          </li>
          <li>
            Verzioniranje podataka implementirano, a pristup je omogućen
            isključivo adminu (authorizovan i autentifikovanom tokenom), u
            suprotnom neće biti moguće pristupiti
            <a href="/audit/master/logs"> AUDIT LOGS </a>
          </li>
          <li>
            Kako bi se omogućile dobre performanse omogućen je load maksimalno
            100 podataka po stranici, paginacijom je moguće pristupiti ostalim
            dijelovima
          </li>
        </ul>

        <ul>
          <span className="ulist-subtitle">Role</span>
          <li>
            Postoji pregled stranica za obe role koje postoje, s tim da samo
            administratorska u trenutnoj postavci ima svoju upotrebnu vrijednost
            dok rola usera samo pozdravlja usera i nema funkciju
          </li>
          <li>
            U daljnoj izradi mogla bi se implemetirati mogućnost promjene
            passworda jer ukoliko administrator kreira usera, user ima default
            password koji je <strong>password123!</strong>
          </li>
        </ul>
      </ul>
      <br />
      <p>
        Da biste pristupili aplikaciji potrebno se registrovati. Klikom na dugme
        <a href="/register" className="create-acc-btn">
          napravi korisnički račun
        </a>
        to možete i uraditi
      </p>

      <p>
        Ukoliko već posjedujete korisnički račun, možete se
        <a href="/login" className="login-btn">
          ovdje
        </a>
        logirati
      </p>

      <footer>
        <p>
          Kreirao <strong>&copy; Admir Sitnić, 2025</strong>
        </p>
      </footer>
    </section>
  );
};
