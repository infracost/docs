import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';


function SignUp({ source }) {
  const { register, handleSubmit, errors, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const { siteConfig } = useDocusaurusContext();

  const api = axios.create({
    baseURL: siteConfig.customFields.infracostWebApiEndpoint,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  async function onSubmit(data) {
    setSubmitSuccess(false);
    setSubmitError(null);
    setIsSubmitting(true);

    var resp;
    try {
      resp = await api.post(`/apiKeys?source=browser-${source}`, data);
      setSubmitSuccess(`Thank you ${data.name}! Your API key has been sent to ${data.email}`);
      reset();
    } catch(err) {
      let msg = "Unknown error";
      if (err.response && err.response.data && err.response.data.error) {
        msg = err.response.data.error;
      }
      setSubmitError(msg);
    }

    setIsSubmitting(false);
  }

  function onVerifyCaptcha() {

  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="robots-only" aria-hidden="true">
        <label>Don’t fill this out if you're human: <input name="isBrowser" readOnly value="1" ref={register()} /></label>
        <label>Don’t fill this out if you're human: <input name="robotsOnlyField" ref={register()} /></label>
      </div>
      <div className="field">
        <input className="input" type="text" name="name" placeholder="Name" ref={register({ required: true })} />
        {errors.email && <span className="error">Name is required</span>}
      </div>
      <div className="field">
        <input className="input" type="email" name="email" placeholder="Email" ref={register({ required: true })} />
        {errors.email && <span className="error">Email is required</span>}
      </div>
      <input
        className="button button--primary button--lg"
        type="submit"
        value="Get an API key"
        disabled={isSubmitting}
      />
      {submitError && (
        <div className="alert alert--danger">
          There was an error requesting an API key:
          <br />
          {submitError}
          <p>Please contact <a href="mailto:hello@infracost.io">hello@infracost.io</a> if you continue to have issues.</p>
        </div>
      )}
      {submitSuccess && <div className="alert alert--success">{submitSuccess}</div>}
    </form>
  )
}

export default SignUp;
