const Slug = (props) => {
  return (
    <pre>
      {JSON.stringify(props, null, 2)}
    </pre>
  );
};

const redirectMap = new Map();

export const getStaticProps = ({ params }) => {
  const { slug = [] } = params;
  const fullSlug = slug.join("/"); 

  const isRedirect = !redirectMap.get(fullSlug);
  redirectMap.set(fullSlug, isRedirect);

  if (isRedirect) {
    return {
      redirect: {
        permanent: false,
        destination: "/redirect",
      },
      revalidate: 10,
    };
  }

  return {
    props: {
      hello: "world",
    },
    revalidate: 10,
  };
};

export const getStaticPaths = () =>  {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default Slug;

