import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Send } from 'lucide-react';
import { CATEGORIES } from '../../data/products';
import { buildFormOrderMessage, waLink } from '../../lib/whatsapp';
import SectionHeading from '../ui/SectionHeading';
import { WhatsAppIcon } from '../ui/Button';
import { Reveal } from '../decor/Reveal';
import { SoftSection } from '../decor/FrostingBlobs';

const inputBase =
  'w-full rounded-2xl border-2 border-cream-200 bg-white/80 px-4 py-3.5 text-sm text-choco-700 placeholder:text-choco-300 transition-colors focus:border-berry-400 focus:outline-none focus:ring-4 focus:ring-berry-100';

const labelCls = 'mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-choco-400';

const initialForm = {
  name: '',
  phone: '',
  product: 'Chocolate Truffle Cake',
  quantity: 1,
  fulfilment: 'Delivery',
  date: '',
  message: '',
};

/**
 * Order form.
 *
 * There is no backend: the form validates in the browser and then hands a fully
 * structured message to WhatsApp. That keeps the site static, free to host and
 * instant for the customer.
 */
export default function OrderForm() {
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState(false);

  const errors = useMemo(() => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name';
    const digits = form.phone.replace(/\D/g, '');
    if (!digits) next.phone = 'Please enter your phone number';
    else if (digits.length < 10) next.phone = 'Enter a valid 10-digit mobile number';
    return next;
  }, [form.name, form.phone]);

  const valid = Object.keys(errors).length === 0;
  const href = waLink(
    buildFormOrderMessage({ ...form, date: form.date || 'As soon as possible' })
  );

  const update = (key) => (event) => {
    const value = event.target.type === 'number' ? Number(event.target.value) : event.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched(true);
    if (!valid) return;
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  const products = useMemo(
    () =>
      CATEGORIES.flatMap((category) =>
        category.products.map((p) => ({ label: `${category.name} — ${p.name}`, value: p.name }))
      ),
    []
  );

  return (
    <SoftSection id="order" tone="cream">
      <div className="container-gc">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Order now"
              title="Place your order in"
              highlight="under a minute"
              script="Almost cake"
              align="left"
              description="Fill in the quick form and we will open WhatsApp with your order already written out. Send the message and we will confirm your slot, flavour and price right away."
            />

            <Reveal className="mt-8 space-y-3">
              {[
                'No sign-up, no payment gateway, no waiting.',
                'We confirm availability and the exact price on WhatsApp.',
                'Advance notice recommended for festivals and wedding cakes.',
              ].map((tip) => (
                <p key={tip} className="flex items-start gap-3 text-sm text-choco-500">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-berry-100 text-berry-700">
                    <Check className="h-3 w-3" aria-hidden="true" />
                  </span>
                  {tip}
                </p>
              ))}
            </Reveal>
          </div>

          <Reveal>
            <OrderFields
              form={form}
              update={update}
              errors={errors}
              touched={touched}
              setTouched={setTouched}
              products={products}
              onSubmit={handleSubmit}
              href={href}
              valid={valid}
            />
          </Reveal>
        </div>
      </div>
    </SoftSection>
  );
}

/** The form card markup, split out to keep the parent readable. */
function OrderFields({ form, update, errors, touched, setTouched, products, onSubmit, href, valid }) {
  return (
    <motion.form
      onSubmit={onSubmit}
      noValidate
      className="glass-card rounded-[2rem] p-6 shadow-lift sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="order-name" className={labelCls}>
            Your name *
          </label>
          <input
            id="order-name"
            type="text"
            value={form.name}
            onChange={update('name')}
            onBlur={() => setTouched(true)}
            placeholder="e.g. Priya Raman"
            aria-invalid={touched && Boolean(errors.name)}
            aria-describedby={touched && errors.name ? 'order-name-error' : undefined}
            className={`${inputBase} ${touched && errors.name ? 'border-berry-500' : ''}`}
          />
          {touched && errors.name ? (
            <p id="order-name-error" className="mt-1.5 text-xs font-semibold text-berry-600">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="order-phone" className={labelCls}>
            Phone number *
          </label>
          <input
            id="order-phone"
            type="tel"
            inputMode="numeric"
            value={form.phone}
            onChange={update('phone')}
            onBlur={() => setTouched(true)}
            placeholder="e.g. 98765 43210"
            aria-invalid={touched && Boolean(errors.phone)}
            aria-describedby={touched && errors.phone ? 'order-phone-error' : undefined}
            className={`${inputBase} ${touched && errors.phone ? 'border-berry-500' : ''}`}
          />
          {touched && errors.phone ? (
            <p id="order-phone-error" className="mt-1.5 text-xs font-semibold text-berry-600">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="order-product" className={labelCls}>
            What would you like?
          </label>
          <select
            id="order-product"
            value={form.product}
            onChange={update('product')}
            className={`${inputBase} pr-10`}
          >
            {products.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
            <option value="Customized Cake">Customized Cake (as per my idea)</option>
            <option value="Not sure yet">Not sure yet — please suggest</option>
          </select>
        </div>

        <div>
          <label htmlFor="order-quantity" className={labelCls}>
            Quantity
          </label>
          <input
            id="order-quantity"
            type="number"
            min="1"
            max="99"
            value={form.quantity}
            onChange={update('quantity')}
            className={inputBase}
          />
        </div>

        <div>
          <label htmlFor="order-fulfilment" className={labelCls}>
            Delivery / Pickup
          </label>
          <select
            id="order-fulfilment"
            value={form.fulfilment}
            onChange={update('fulfilment')}
            className={`${inputBase} pr-10`}
          >
            <option>Delivery</option>
            <option>Pickup from shop</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="order-date" className={labelCls}>
            Required date
          </label>
          <input
            id="order-date"
            type="date"
            value={form.date}
            onChange={update('date')}
            className={inputBase}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="order-message" className={labelCls}>
            Message on the cake / special notes
          </label>
          <textarea
            id="order-message"
            rows={3}
            value={form.message}
            onChange={update('message')}
            placeholder="e.g. Write “Happy Birthday Aadhu” on top, chocolate flavour, 20 servings."
            className={`${inputBase} resize-none`}
          />
        </div>
      </div>

      <a
        href={href}
        role="button"
        onClick={(event) => {
          if (!valid) {
            event.preventDefault();
            onSubmit(event);
          }
        }}
        className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-6 py-4 text-base font-semibold text-white shadow-whatsapp transition-all hover:brightness-110 active:scale-[0.99] ${
          touched && !valid ? 'pointer-events-none opacity-60' : ''
        }`}
      >
        <WhatsAppIcon className="h-5 w-5" />
        Send order on WhatsApp
      </a>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-choco-400">
        <Send className="h-3.5 w-3.5" aria-hidden="true" />
        Opens WhatsApp with your order pre-filled — nothing is stored on this site.
      </p>
    </motion.form>
  );
}
