// import * as React from 'react';
// import { useStaticQuery, graphql, Link } from 'gatsby';
// import Layout from '../components/layout';
// import { FilterBar } from '../components/FilterBar';

// export default function ResourcesPage() {
//   const data = useStaticQuery(graphql`
//     query allResourcesQuery {
//       allContentfulProduct {
//         edges {
//           node {
//             id
//             title
//             prettyUrl
//             fixedNav
//             noIndex
//             type
//             publicationDate
//             people {
//               id
//               displayName
//               prettyUrl
//             }
//           }
//         }
//       }
//     }
//   `);

//   let resources = data.allContentfulProduct;

//   return (
//     <Layout>
//       <>
//         <div className="p-8 pt-0 pb-5">
//           <div className="grid lg:grid-cols-5 md:grid-cols-5">
//             <div className="col-span-10 mb-5 notched notched--border">
//               <h1 className="generic-heading-1">Resources</h1>
//             </div>
            
//             <FilterBar />
//           </div>
//         </div>

//         <div className="p-8 pt-0 pb-5 list">
//           <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-5">
//             {resources &&
//               resources.edges.map(resource => (
//                 <Link key={resource.node.id} to={resource.node.prettyUrl} className="lg:col-span-1 notched notched--border notched--border--hover list-item">
//                   <p className="title">{resource.node.title}</p>
//                   <span className="type">Type</span>
//                 </Link>
//               ))}
//           </div>
//         </div>
//       </>
//     </Layout>
//   );
// }
