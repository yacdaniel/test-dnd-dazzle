<#import "/templates/system/common/cstudio-support.ftl" as studio />


<section id="slider" class="slider swiper_wrapper clearfix"  <@studio.componentAttr path=contentModel.storeUrl ice=true />>

	<!--
    -parallax
    <div class="slider-parallax-inner"> -->

		<div class="swiper-container swiper-parent">
			<div class="swiper-wrapper">

				<#list contentModel.slides.item as slide>

					<#if slide.mp4Video?exists || slide.vebmVideo?exists>

						<div class="swiper-slide dark">
							<div class="container clearfix">
								<div class="slider-caption slider-caption-center">
									<h2 data-caption-animate="fadeInUp">${slide.headline}</h2>
									<p data-caption-animate="fadeInUp" data-caption-delay="200">${slide.subHeadline}</p>
								</div>
							</div>
							<div class="video-wrap">
								<video poster="${slide.image}" preload="auto" loop autoplay muted>
									<#if slide.mp4Video??>
										<source src='${slide.mp4Video}' type='video/mp4' />
									</#if>

									<#if slide.webmvideo??>
										<source src='${slide.webmVideo}' type='video/webm' />
									</#if>
								</video>
								<div class="video-overlay" style="background-color: rgba(0,0,0,0.55);"></div>
							</div>
						</div>
					<#else>
						<div class="swiper-slide" style="background-image: url('${slide.image}'); background-position: center top;">
							<div class="container clearfix">
								<div class="slider-caption">
									<h2 data-caption-animate="fadeInUp">${slide.headline}</h2>
									<p data-caption-animate="fadeInUp" data-caption-delay="200">${slide.subHeadline}</p>
								</div>
							</div>
						</div>
					</#if>

				</#list>
				
			</div>
			<div id="slider-arrow-left"><i class="icon-angle-left"></i></div>
			<div id="slider-arrow-right"><i class="icon-angle-right"></i></div>
			<div id="slide-number"><div id="slide-number-current"></div><span>/</span><div id="slide-number-total"></div></div>
		</div>

	<!--</div>-->

</section>
