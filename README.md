# Pieni puukkopaja

Käsityönä tehdyt suomalaiset puukot Varkaudesta — yksisivuinen käsityöläisverkkosivusto.

## Tietoa

Pieni puukkopaja on pieni käsityöläisbrändi, joka valmistaa perinteisiä suomalaisia puukkoja Varkaudessa. Tämä sivusto toimii pajamme digitaalisena myymälänä esitellen puukkomalleja, valmistusprosessia, tilaustietoja ja yhteystiedot.

## Teknologiapino

- **HTML** — semanttinen, saavutettava yksisivuinen ulkoasu pehmeällä vieritysnavigoinnilla
- **Tailwind CSS** — apuluokkapohjainen tyylittely CDN:n kautta mukautetulla pohjoismaisella metsäteemalla
- **Font Awesome** — kuvakkeet käyttöliittymäelementeille
- **Google Fonts** — Inter (leipäteksti) ja Lora (otsikot)
- **Vanilla JavaScript** — mobiilivalikko, vierityspaljastusanimaatiot, yhteydenottolomake, ilmoitusviestit

Ei rakennustyökaluja, ei kehyksiä — avaa vain `index.html` selaimessa.

## Väriteema

| Nimi | Hex | Käyttötarkoitus |
|---|---|---|
| Pine | `#2C302E` | Ensisijainen teksti, tummat osiot |
| Linen | `#EBE9E4` | Sivun tausta |
| Wool | `#F4F2EE` | Kortit ja pinnat |
| Lichen | `#6B6F64` | Toissijainen teksti, tarrat |
| Rust | `#C27E3E` | Painikkeet, linkit, korostukset |
| Moss | `#5A6B4A` | Reunukset, toissijainen korostus |
| Smoke | `#8C7A6B` | Kolmannen tason korostukset |
| Drift | `#D6D3C8` | Reunukset, jakajat |

## Julkaisu

Tämä sivusto on suunniteltu julkaistavaksi suoraan **GitHub Pagesiin** ilman rakennusvaihetta.

### Vaihtoehto 1: Julkaisu juurihakemistosta

1. Työnnä repositorio GitHubiin
2. Siirry kohtaan **Settings → Pages**
3. Valitse **Branch**-kohdassa `main` ja `/ (root)`
4. Klikkaa **Save**

Sivusto on käytettävissä osoitteessa `https://<käyttäjätunnus>.github.io/<repo>/`.

### Vaihtoehto 2: Mukautettu verkkotunnus

1. Lisää `CNAME`-tiedosto repositorioon, joka sisältää verkkotunnuksesi (esim. `pienipuukkopaja.fi`)
2. DNS-palveluntarjoajallasi osoita verkkotunnus GitHub Pagesiin:
   - **CNAME-tietue**: `<käyttäjätunnus>.github.io`
3. Ota käyttöön **Enforce HTTPS** kohdassa Settings → Pages

## Projektin rakenne

```
pieni-puukkopaja/
├── index.html          Pääsivu
├── main.js             Interaktiivisuus (valikko, vieritys, lomake, ilmoitukset)
├── style.css           Mukautetut tyylit (paljastusanimaatiot, hero-tausta, ilmoitukset)
├── public/
│   ├── figurine.jpg    Koristekuvioitu puukko
│   ├── hero.png        Hero-taustakuva
│   ├── normal.jpg      Peruspuukko
│   ├── special.jpg     Tilauspuukko
│   └── workshop.png    Pajakuva
└── README.md
```

## Lisenssi

Kaikki oikeudet pidätetään. Kuvat ja sisältö kuuluvat Pieni puukkopajalle.
