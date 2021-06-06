import Layout from "../../components/layout";
import { useRouter } from 'next/router'

const DipPage = () => {
    const router = useRouter()
    const { dipId } = router.query
    return (
      <Layout>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h1>This is a share page for dip #{dipId}</h1>
          </div>
        </section>
      </Layout>
    );
  };
  
  export default DipPage;
  