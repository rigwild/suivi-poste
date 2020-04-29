# suivi-poste
> Suivre les envois postaux

La Poste fourni en Open Data une [API de suivi postal](https://developer.laposte.fr/products/suivi/latest). Ce module permet de consommer cette API.

Les produits supportés sont les suivants :

 - Courriers suivis national
 - Courriers suivis international
 - Colis Colissimo
 - Envois Chronopost

Il faut s'inscrire sur le portail [developer.laposte.fr](https://developer.laposte.fr) pour générer une clef d'API en mode production.

Documentation des réponses d'API : https://developer.laposte.fr/products/suivi/latest

## Installation
```sh
$ yarn add suivi-poste # or npm i suivi-poste
```

## Usage
```js
import suiviPoste from 'suivi-poste'

const suiviPostApi = suiviPoste.api('my-api-key')

const result = await suiviPostApi.getTracking('6A15602676300', 'A00000001', '6A15602683841')
console.log(result)
```

## Related
 - [suivi-poste-cli](https://github.com/rigwild/suivi-poste-cli) - CLI pour ce module
 - [suivi-poste-proxy](https://gist.github.com/rigwild/c88e5a85fb1f1365cecbbe597dd5dcca) - Serveur proxy pour ce module

## License
[The MIT license](./LICENSE)
