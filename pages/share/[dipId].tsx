import Layout from "../../components/layout";
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useRealtime } from 'react-supabase'

const DipPage = () => {
  const router = useRouter()
  const { dipId } = router.query;
  const bsvUsd = 180;

  const [dipQuery] = useRealtime('dips')
  const [jigQuery] = useRealtime('jigs')

  if (dipQuery.fetching || !dipQuery.data || !dipQuery.data.length || !jigQuery.data || !jigQuery.data.length) return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <p>Loading lucky dip...</p>
        </div>
      </section>
    </Layout>
  )

  if (dipQuery.error) return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <p>Oh no... {dipQuery.error.message}</p>
        </div>
      </section>
    </Layout>
  )

  const dip = dipQuery.data.filter((row) => `${row.dipId}` === dipId)[0];
  let prizes = {};
  const jigs = jigQuery.data.filter((row) => `${row.includedInDip}` === dipId).forEach(jig => {
    prizes[jig.jigId] = jig
  });

  if (!dip) return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h1>Lucky dip #{dipId} not found.</h1>
        </div>
      </section>
    </Layout>
  )

  const ticketPriceUsd = 0.000005 * dip.ticketPriceDuro * bsvUsd;
  const fiveDollarsWorth = Math.ceil(5 / ticketPriceUsd);

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <img src="/icons/lineal/svg/001-block.svg" className="max-h-20 mb-8" />
          <h1 className="mb-2">LuckyDip <strong>#{dipId}</strong></h1>
          <p><em>created by: {dip.creator}</em></p>
          <Link href="/about">
            <button type="button" className="bg-blue-500 hover:bg-blue-600">
              About LuckyDip.run
            </button>
            <Link href='/'>
                <button type="button" className="bg-blue-500 hover:bg-blue-600">
                    Home
                </button>
            </Link>
          </Link>
          {/*<Link href={`/api/dip/${dipId}`}>
            <button type="button" className="bg-blue-500 hover:bg-blue-600">
              API for this page
            </button>
          </Link>*/}
          <h2 className="my-8">This <Link href="/about#fairness">(provably fair)</Link> lucky dip is fundraising for <strong>{dip.cause}.</strong></h2>
          <p className="text-lg">Ticket Price: {dip.ticketPriceDuro} Đ (~${ticketPriceUsd})</p>
          <button type="button" className="text-white bg-gradient-to-b from-red-600 to-red-800 hover:from-red-700 hover:to-red-900">
            Buy a ticket (~${ticketPriceUsd})
          </button>
          <button type="button" className="text-blue-700 bg-white hover:bg-gray-100">
            Buy 2 tickets (~${ticketPriceUsd * 2})
          </button>
          <button type="button" className="text-blue-700 bg-white hover:bg-gray-100">
            Buy {fiveDollarsWorth} tickets (~${ticketPriceUsd * fiveDollarsWorth})
          </button>
          <h2>Prizes:</h2>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-3 gap-4 mt-8">
          {dip.jigs.unlocked.map((jigId, index) => <div className="prize" key={index}>
            Unlocked: {prizes[`${jigId}`].name}
            {prizes[`${jigId}`].emoji ? <p className="text-4xl">{prizes[`${jigId}`].emoji}</p> : null}
          </div>)}
          {dip.jigs.locked.map((jigId, index) => <div className="prize" key={index}>Locked: ???</div>)}
        </div>
      </section>
    </Layout>
  );
};

export default DipPage;
