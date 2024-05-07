<template>
    <nav class="navbar navbar-default">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#navbar-collapse" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.html"><img src="@/assets/images/logo.png" alt="Site Logo" /></a>
            </div>

            <!-- Collect the nav links and other content for toggling -->
            <div class="collapse navbar-collapse" id="navbar-collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li class="ml15"><a class="button alt" href="price-table.html">Reserve Your Seat</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li class="current"><a href="index.html">Home</a></li>
                    <li><a href="speakers.html">Speakers</a></li>
                    <li><a href="schedule.html">Schedule</a></li>
                    <li><a href="sponsors.html">Sponsors</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Pages <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="about.html">About</a></li>
                            <li><a href="accommodation.html">Accommodation</a></li>
                            <li><a href="gallery.html">Gallery</a></li>
                            <li><a href="price-table.html">Price Table</a></li>
                            <li><a href="blog.html">Blog</a></li>
                            <li><a href="blog-single.html">Blog Single</a></li>
                            <li><a href="404.html">404 Error</a></li>
                        </ul>
                    </li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container -->
    </nav>
</template>