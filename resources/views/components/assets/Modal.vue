<template>
    <!--- modal do samuel chato tw-justify-center tw-items-center -->

<section class="tw-absolute tw-flex tw-top-0 tw-left-0 tw-w-full tw-h-full tw-z-10 tw-bg-black/70">

    <section class="tw-w-[60%] tw-bg-white tw-h-auto tw-overflow-hidden tw-rounded-md
        tw-absolute tw-top-[50%] tw-left-[50%] tw-translate-x-[-50%] tw-translate-y-[-50%]
    ">
        <header class="tw-w-full tw-flex tw-border tw-border-b-[1px] tw-border-slate-300">
            
            <div class="tw-w-[calc(100%_-_40px)] tw-flex tw-p-4">
                <h1 class="tw-font-semibold tw-text-slate-500">Aqui é o titulo da modal</h1>
            </div>

            <div class="tw-flex tw-justify-center tw-items-center tw-w-[60px] tw-cursor-pointer hover:tw-bg-slate-200">
                <n-icon class="tw-text-slate-600" size="20">
                    <CloseFilled />
                </n-icon>
            </div>
        </header>
        

        <section class="tw-w-full tw-flex tw-p-4">
            aqui é o conteúdo da modal
        </section>
    </section>

</section>
<!--- fim modal do samuel chato -->
</template>