import * as React from 'react';
import Layout from '../components/layout';
import { FilterBar } from '../components/FilterBar';

export default function ListTemplate() {
  return (
    <Layout>
      <>
        <div className="p-8 pt-0 pb-5">
          <div className="grid lg:grid-cols-5 md:grid-cols-5">
            <div className="col-span-10 mb-5 notched notched--border">
              <h1 className="generic-heading-1">List Template</h1>
            </div>
            <FilterBar />
          </div>
        </div>

        <div className="p-8 pt-0 pb-5 list">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-5">
            <div className="lg:col-span-1 notched notched--border notched--border--hover list-item">
              <p className="title">Title</p>
              <span className="type">Type</span>
            </div>
            <div className="notched notched--border notched--border--hover list-item">
              <p className="title">Title</p>
              <span className="type">Type</span>
            </div>
            <div className="notched notched--border notched--border--hover list-item">
              <p className="title">Title</p>
              <span className="type">Type</span>
            </div>
            <div className="notched notched--border notched--border--hover list-item">
              <p className="title">Title</p>
              <span className="type">Type</span>
            </div>
            <div className="notched notched--border notched--border--hover list-item">
              <p className="title">Title</p>
              <span className="type">Type</span>
            </div>
          </div>
        </div>
      </>
    </Layout>
  )
}
