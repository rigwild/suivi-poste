import fetch from 'node-fetch'

export declare interface SuiviPosteOptions {
  /** Suivi colis API key */
  token: string
  /** API endpoint */
  uri?: string
  /** Request User Agent */
  userAgent?: string
}

/**
 * Provide `suivi-poste` options.
 *
 * Get an API key at https://developer.laposte.fr/products/suivi/latest
 */
export const suiviPosteApi = ({
  token,
  uri = 'https://api.laposte.fr/suivi/v2/idships',
  userAgent = 'github.com/rigwild/suivi-poste v0.3.0'
}: SuiviPosteOptions) => ({
  /**
   * Load shipments tracking data
   * @param trackingNumbers Shipments tracking numbers
   */
  getTracking: (...trackingNumbers: string[]) =>
    fetch(`${uri}/${trackingNumbers.join(',')}?lang=fr_FR`, {
      headers: {
        Accept: 'application/json',
        'X-Okapi-Key': token,
        'User-Agent': userAgent
      }
    }).then(async res => {
      // FIXME: Currently, there's a problem with the API, when the tracking number is invalid,
      // the API may return a 404 not found and no JSON.
      // Mock the response for now.
      if (!res.headers.get('content-type')?.includes('application/json')) {
        res.json = () =>
          // @ts-ignore
          (trackingNumbers.length > 1 ? trackingNumbers : [trackingNumbers]).map(trackingNumber => ({
            returnCode: 400,
            returnMessage: 'Votre numéro est inconnu. Veuillez le ressaisir en respectant le format.',
            lang: 'fr_FR',
            scope: 'open',
            idShip: trackingNumber
          }))
      }

      const json = await res.json()
      if (!res.ok) throw json
      return json
    })
})

/** List of shipments possible events */
export const events = {
  DR1: { msg: 'Déclaratif réceptionné', step: 1 },
  PC1: { msg: 'Pris en charge', step: 2 },
  PC2: { msg: 'Pris en charge dans le pays d’expédition', step: 2 },
  ET1: { msg: 'En cours de traitement', step: 3 },
  ET2: { msg: 'En cours de traitement dans le pays d’expédition', step: 3 },
  ET3: { msg: 'En cours de traitement dans le pays de destination', step: 3 },
  ET4: { msg: 'En cours de traitement dans un pays de transit', step: 3 },
  EP1: { msg: 'En attente de présentation', step: 3 },
  DO1: { msg: 'Entrée en Douane', step: 3 },
  DO2: { msg: 'Sortie de Douane', step: 3 },
  DO3: { msg: 'Retenu en Douane', step: 3 },
  PB1: { msg: 'Problème en cours', step: 3 },
  PB2: { msg: 'Problème résolu', step: 3 },
  MD2: { msg: 'Mis en distribution', step: 4 },
  ND1: { msg: 'Non distribuable', step: 4 },
  AG1: { msg: 'En attente d’être retiré au guichet', step: 4 },
  RE1: { msg: 'Retourné à l’expéditeur', step: 4 },
  DI1: { msg: 'Distribué', step: 5 },
  DI2: { msg: 'Distribué à l’expéditeur', step: 5 }
} as const

export const shipmentHolderEnum = {
  '1': 'Courrier national',
  '2': 'Courrier international',
  '3': 'Chronopost',
  '4': 'Colissimo'
} as const
export const shipmentTimelineElemTypeEnum = {
  '1': 'OK',
  '0': 'Aléa',
  '-1': 'KO'
} as const
export const shipmentContextDataDeliveryChoiceEnum = {
  '0': '',
  '1': 'Possible',
  '2': 'Choisi'
} as const
