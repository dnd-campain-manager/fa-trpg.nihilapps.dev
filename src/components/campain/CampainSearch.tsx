'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Icon } from '@iconify/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useRouter } from 'next/navigation';
import {
  Button, Card, CardContent, Form, FormControl, FormField, FormItem, Input
} from '@/src/shadcn';

interface Props {
  styles?: ClassNameValue;
}

interface Inputs {
  search: string;
}

export function CampainSearch({ styles, }: Props) {
  const formModel = object({
    search: string(),
  });

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(formModel),
    defaultValues: {
      search: '',
    },
  });

  const router = useRouter();

  const onClickSearch: SubmitHandler<Inputs> = useCallback(
    (data) => {
      if (!data.search) {
        return;
      }

      router.push(`/campains?search=${data.search}`);
    },
    []
  );

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <div className={css.default}>
        <Card className=''>
          <CardContent className='!p-2'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onClickSearch)}>
                <FormField
                  control={form.control}
                  render={
                    ({ field, }) => (
                      <FormItem className='flex flex-row gap-1 items-center justify-center'>
                        <FormControl>
                          <Input
                            type='text'
                            placeholder='검색어를 입력하세요.'
                            value={field.value}
                            onChange={field.onChange}
                            className='!placeholder:text-middle !text-middle !border-black-300'
                          />
                        </FormControl>
                        <Button type='submit' className='!m-0 hover:!bg-blue-500'>
                          <Icon icon='ph:magnifying-glass-bold' className='text-[140%]' />
                        </Button>
                      </FormItem>
                    )
                  }
                  name='search'
                />
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
