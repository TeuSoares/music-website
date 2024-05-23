<?php

namespace Tests\Unit\Auth;

use Domain\Music\Requests\MutationMusicRequest;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;
use Tests\Traits\ValidationTrait;

class MutationMusicRequestTest extends TestCase
{
    use ValidationTrait;

    public function test_validation_should_fail_if_payload_is_incorrect(): void
    {
        $file = UploadedFile::fake()->image('image.gif');

        $invalidData = [
            'artist'       => '',
            'genre'        => 'Rock',
            'name'         => 'Believer',
            'link_youtube' => '',
            'thumbnail'    => $file
        ];

        $fails = $this->checkIfExistsValidationError(new MutationMusicRequest, $invalidData);

        $this->assertEquals(true, $fails);
    }

    public function test_validation_must_pass_if_the_payload_is_correct(): void
    {
        $file = UploadedFile::fake()->image('thumbnail.jpg');

        $validData = [
            'artist'       => 'Imagine Dragons',
            'genre'        => 'Rock',
            'name'         => 'Believer',
            'link_youtube' => 'https://www.youtube.com/watch?v=7wtfhZwyrcc',
            'thumbnail'    => $file
        ];

        $fails = $this->checkIfExistsValidationError(new MutationMusicRequest, $validData);

        $this->assertEquals(false, $fails);
    }

    public function test_validations_should_fail_if_the_thumbnail_is_not_an_image(): void
    {
        $file = UploadedFile::fake()->create('document.pdf');

        $data = [
            'artist'       => 'Imagine Dragons',
            'genre'        => 'Rock',
            'name'         => 'Believer',
            'link_youtube' => 'https://www.youtube.com/embed/7wtfhZwyrcc',
            'thumbnail'    => $file
        ];

        $fails = $this->checkIfExistsValidationError(new MutationMusicRequest, $data);

        $this->assertEquals(true, $fails);
    }

    public function test_validations_should_fail_if_the_thumbnail_is_not_jpg_or_png_image(): void
    {
        $file = UploadedFile::fake()->image('image.gif');

        $data = [
            'artist'       => 'Imagine Dragons',
            'genre'        => 'Rock',
            'name'         => 'Believer',
            'link_youtube' => 'https://www.youtube.com/embed/7wtfhZwyrcc',
            'thumbnail'    => $file
        ];

        $fails = $this->checkIfExistsValidationError(new MutationMusicRequest, $data);

        $this->assertEquals(true, $fails);
    }
}
