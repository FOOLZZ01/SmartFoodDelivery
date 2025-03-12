Sistem sledi načelom Clean Architecture in uporablja mikroservisni pristop. Posamezne komponente so neodvisne in komunicirajo preko REST API klicev.

🔹 Order Service

Upravljanje naročil (ustvarjanje, sledenje, potrjevanje).

Spremljanje statusa naročil.

Integracija s Restaurant Service za preverjanje menijev.

🔹 Restaurant Service

Upravljanje restavracij.

Shranjevanje in posodabljanje menijev.

Komunikacija z Order Service za preverjanje naročil.

🔹 User Service

Upravljanje uporabniških računov (prijava, registracija).

Hramba uporabniških podatkov.

Avtentikacija in avtorizacija.

