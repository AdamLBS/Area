<page>
    <actionBar title="Home" />
    <gridLayout>
        <label class="info">
            <formattedString>
                <span text=" {message}" />
            </formattedString>
        </label>
    </gridLayout>
</page>

<script lang="ts">
    let message: string = "Bonjour Ramdane Martin"
</script>

<style>
    .info .fas {
        color: #3A53FF;
    }

    .info {
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }
</style>
