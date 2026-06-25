import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/layout';
import Seo from '../components/seo';

import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';

const Test = () => {
  const data = useStaticQuery(graphql`
    query CertifyQuery {
      certifyValidations {
        softwareLicense
        responsiblePartyType
        primaryType
        country
        documentationLicense
        hardwareLicense
        additionalType
      }
      allProjects {
        edges {
          node {
            projects {
              id
              oshwaUid
              responsibleParty
              projectName
            }
          }
        }
      }
    }
  `);
  const question = {
    title:
      'Does your project build upon or incorporate hardware already registered with OSHWA?',
    contentfulFieldName: 'previousVersions',
    formPlaceholder: 'Enter the OSHWA UID of a previous version',
    type: 'array',
    fieldType: 'reference',
    requiredErrorMessage: '',
    requiredDependency: '',
    instructions:
      'If you or others have previously registered a version of your project, or your project incorporates previously registered projects, type in the UID for that project.',
    layout: 'form-half-stacked',
  };

  const { handleSubmit, control } = useForm({
    defaultValues: {
      previousVersions: null, // It is best practice to define your default values
    },
  });

  const options = data.allProjects.edges[0].node.projects;

  let allOptions =
    options.map(option => ({
      value: option.id,
      label: `${option.oshwaUid}: ${option.responsibleParty} - ${option.projectName}`,
    })) || [];

  const onSubmit = data => {
    console.log(data, 'data');
    // Output: { fruit: { value: 'apple', label: 'Apple' } }
  };
  return (
    <Layout>
      <div className="p-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Select :</label>

          <Controller
            name={question.contentfulFieldName}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={allOptions}
                isMulti
                placeholder={question.formPlaceholder}
              />
            )}
          ></Controller>

          <button type="submit">Submit</button>
        </form>
      </div>
    </Layout>
  );
};

export const Head = () => (
  <Seo
    title="Test"
    description="The Open Source Hardware Association (OSHWA) aims to foster technological knowledge and encourage research that is accessible, collaborative and respects user freedom."
  />
);
export default Test;
