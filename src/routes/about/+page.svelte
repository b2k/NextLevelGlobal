<script>
  import {Actions, Hero} from '$lib/components';
  import { Container } from '@sveltestrap/sveltestrap';
</script>

<Hero >
  <h1 class="display-4 fw-bold text-white">
    About Next Level Global
  </h1>
  <p class="lead text-white mt-3">
    Equipping leaders. Transforming communities.
  </p>
</Hero>

<Container>
<h2>About Us</h2>

<p>We're really cool and we love Jesus! What more do you need to know!?</p>

<p>Our goal is simple. We want to help people become disciples of Jesus. 
  That does not happen by accident. You need a plan and you need to work your plan. 
  And it's a lot easier when you are doing that with other like-minded men or women.</p>

<p>It's easy to get started, just click <a href="/contact-us">Contact Us</a> 
  to join a group or review the <a href="/quick-links">Quick Links</a> on our home 
  page to review our program.</p>

<h2>Testimonials</h2>

<blockquote>These are things I've been taught, heard many times, in sermons and 
  readings. But, in Next Level, you take them personally, in a deeper way. You 
  have a structure, you have accountability with your brothers and you work together. 
  So when you go uphill it takes a bit more effort, but as you climb, what's the reward? 
  You get closer to God. - Ovi Poenar</blockquote>

  <blockquote>I was stuck. I was tired of being an ineffective Christian. I was 
    ashamed about how little I knew about the Bible. What I did know, I didn't 
    put into action. Next Level changed all of that for me. It also changed my 
    mind.<br/>​"Do not conform any longer to the patterns of this world, but be
    transformed by the renewing of your mind. Then you will be able to test and 
    approve what God's will is. His good, pleasing and perfect will." (Romans 12:2)
    <br/>Next Level has completely changed my life - Jack Davy</blockquote>
</Container>

<Actions
  align="center"
  actions={[
    {
      href: '/contact-us',
      text: 'Contact Us',
      variant: 'outline-dark'
    },
    {
      href: '/beliefs',
      text: 'Beliefs',
      variant: 'dark'
    },
    {
      href: '/faq',
      text: 'F.A.Q.',
      variant: 'dark'
    }
  ]}
/>
