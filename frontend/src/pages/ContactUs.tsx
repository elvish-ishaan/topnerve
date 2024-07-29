import React from 'react';

const ContactUs = () => {
  return (
    <div className="min-h-screen py-3 w-full flex justify-center items-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full ml-56">
        <h1 className="text-4xl font-bold text-btn-main mb-10 text-center">Contact Us</h1>
        
        <section className="mb-6">
          <p className="text-btn-lmain text-lg text-center">
            We would love to hear from you! Whether you have a question about features, pricing, need a demo, or anything else, our team is ready to answer all your questions.
          </p>
        </section>
        
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-btn-lmain text-lg font-medium mb-2">Name</label>
            <input type="text" id="name" className="w-full p-3 rounded-lg bg-slate-800 text-white focus:ring-2 focus:ring-btn-main" />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-btn-lmain text-lg font-medium mb-2">Email</label>
            <input type="email" id="email" className="w-full p-3 rounded-lg bg-slate-800 text-white focus:ring-2 focus:ring-btn-main" />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-btn-lmain text-lg font-medium mb-2">Message</label>
            <textarea id="message" rows="6" className="w-full p-3 rounded-lg bg-slate-800 text-white focus:ring-2 focus:ring-btn-main"></textarea>
          </div>
          
          <div className="text-center">
            <button type="submit" className="px-6 py-3 rounded-lg bg-btn-main text-white font-semibold hover:bg-btn-lmain transition-colors">Send Message</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
