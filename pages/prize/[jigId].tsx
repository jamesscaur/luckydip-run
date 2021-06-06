import Layout from "../../components/layout";
import { useRouter } from 'next/router'

const PrizePage = () => {
    const router = useRouter()
    const { jigId } = router.query
    return (
      <Layout>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h1>This is a share page for prize #{jigId}</h1>
          </div>
        </section>
      </Layout>
    );
  };
  
  export default PrizePage;
  