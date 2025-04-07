# Imel d.o.o Lukavac - Deadline 18.04.2025

# Tasks from Imel

# Zadatak 1: Implementacija funkcionalnosti za prijavu korisnika (Login)

Opis zadatka:
Kandidat treba implementirati funkcionalnost prijave korisnika koristeći
ASP.NET Core za backend i React.js za frontend.

Zahtjevi:

• Backend:

- Kreirati API endpoint za prijavu korisnika.
- Implementirati autentifikaciju putem JWT tokena.
- Pohranjivati lozinke u hashiranom obliku koristeći sigurnu metodu (npr. BCrypt).
- Ograničiti broj neuspjelih pokušaja prijave radi zaštite od brute-force napada.

• Frontend:

- Kreirati formu za prijavu sa poljima za email adresu i lozinku.
- Implementirati validaciju unosa (obavezna polja, validan format email adrese, minimalna dužina lozinke).
- Pohraniti JWT token u sessionStorage i koristiti ga za autorizaciju daljnjih zahtjeva.

• Dodatni kriteriji:

- Implementirati osnovne sigurnosne mjere kao što su CORS zaštita i HTTPS enkripcija.

# Zadatak 2: Implementacija funkcionalnosti za upravljanje korisnicima (CRUD operacije)

Opis zadatka:
Nakon što je omogućena prijava korisnika, kandidat treba implementirati
funkcionalnosti za upravljanje korisnicima.

Zahtjevi:

• Backend:

- Kreirati API endpoint-e za dodavanje, ispravku, pregled i brisanje korisnika.
- Omogućiti promjenu statusa korisnika (aktivan/neaktivan).
- Implementirati validaciju podataka prilikom dodavanja i izmjene korisnika.
- Ograničiti pristup CRUD operacijama na administrativne korisnike.

• Frontend:

- Kreirati korisnički interfejs koristeći DevExpress DataGrid komponentu za prikaz liste korisnika.
- Implementirati formu za dodavanje i izmjenu korisnika.
- Omogućiti brisanje korisnika uz potvrdu akcije.
- Implementirati funkcionalnost za izvoz liste korisnika (CSV, Excel, PDF).

• Dodatni kriteriji:

- Implementirati paginaciju i pretragu korisnika na serverskoj strani.
- Omogućiti filtriranje korisnika prema statusu.

# Zadatak 3: Implementacija verzioniranja podataka i evidencije promjena (Audit Log)

Opis zadatka:
Kandidat treba proširiti sistem tako da omogućava verzioniranje podataka i
evidenciju promjena, kako bi se sačuvao historijat izmjena korisnika.

Zahtjevi:

• Backend:

- Implementirati verzioniranje podataka tako da se svaka izmjena korisnika bilježi kao nova verzija, a prethodne verzije ostaju dostupne.
- Kreirati API endpoint za dohvatanje historijskih verzija korisnika.
- Implementirati sistemski audit log koji bilježi ko je i kada napravio određenu promjenu.

• Frontend:

- Omogućiti prikaz historijskih verzija korisnika unutar posebne sekcije u aplikaciji.
- Implementirati mogućnost vraćanja na prethodnu verziju podataka korisnika.
- Prikazati listu svih promjena sa datumom i korisnikom koji je napravio izmjenu.

• Dodatni kriteriji:

- Osigurati da samo administratori mogu pregledati i upravljati historijskim verzijama podataka.
- Implementirati optimizovano učitavanje historijskih podataka kako bi se smanjilo opterećenje baze.
